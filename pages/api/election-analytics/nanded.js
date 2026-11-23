import path from "path";
import fs from "fs";
import dbConnect from "@/lib/dbConnect";
import ElectionOverview from "@/models/ElectionOverview";

export default async function handler(req, res) {
  // Allow GET and POST/PUT for updating election intelligence
  if (req.method !== "GET" && req.method !== "POST" && req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // Handle Updates to MongoDB
  if (req.method === "POST" || req.method === "PUT") {
    try {
      await dbConnect();
      const updatedDoc = await ElectionOverview.findOneAndUpdate(
        { slug: "nanded-pc" },
        {
          ...req.body,
          slug: "nanded-pc",
          lastUpdated: new Date()
        },
        { upsert: true, new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Election intelligence successfully updated in MongoDB Atlas (visitorpatil).",
        data: updatedDoc
      });
    } catch (err) {
      console.error("Error saving election overview to MongoDB:", err);
      return res.status(500).json({ success: false, message: "Database update error: " + err.message });
    }
  }

  // Handle GET
  try {
    let doc = null;
    let dataSource = "MongoDB Atlas (visitorpatil)";

    // 1. Try querying MongoDB Atlas
    try {
      await dbConnect();
      doc = await ElectionOverview.findOne({ slug: "nanded-pc" }).lean();

      // If collection is empty, auto-seed from local JSON into MongoDB Atlas
      if (!doc) {
        const filePath = path.join(process.cwd(), "lib", "electionData", "nandedOverview.json");
        if (fs.existsSync(filePath)) {
          const rawData = fs.readFileSync(filePath, "utf-8");
          const jsonData = JSON.parse(rawData);
          doc = await ElectionOverview.create({
            slug: "nanded-pc",
            title: "Nanded Parliamentary Constituency Overview - Lok Sabha",
            source: "Nanded PC Overview.pdf",
            lastUpdated: new Date(),
            ...jsonData
          });
          doc = doc.toObject();
        }
      }
    } catch (dbErr) {
      console.warn("MongoDB Atlas connection notice in nanded.js:", dbErr.message);
    }

    // 2. Fallback to local JSON if MongoDB was unreachable
    if (!doc) {
      const filePath = path.join(process.cwd(), "lib", "electionData", "nandedOverview.json");
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: "Election data not found" });
      }
      const rawData = fs.readFileSync(filePath, "utf-8");
      doc = JSON.parse(rawData);
      dataSource = "Local Backup File";
    }

    const { ac, sector } = req.query;
    let responseData = { ...doc };

    if (ac && responseData.assemblyConstituencies) {
      const parsedAc = parseInt(ac, 10);
      const filteredAc = responseData.assemblyConstituencies.find(
        (c) => c.acNo === parsedAc || String(c.name).toLowerCase() === String(ac).toLowerCase()
      );
      if (filteredAc) {
        responseData.selectedConstituency = filteredAc;
      }
    }

    if (sector && responseData.issuesAndDemands) {
      const filteredIssues = responseData.issuesAndDemands.filter(
        (item) => String(item.sector).toLowerCase() === String(sector).toLowerCase()
      );
      responseData.filteredIssues = filteredIssues;
    }

    return res.status(200).json({
      success: true,
      source: dataSource,
      database: "visitorpatil",
      collection: "electionoverviews",
      lastUpdated: doc.lastUpdated || doc.updatedAt || new Date().toISOString(),
      data: responseData,
    });
  } catch (error) {
    console.error("Error reading election analytics:", error);
    return res.status(500).json({ success: false, message: "Failed to load election analytics: " + error.message });
  }
}
