"""
Nanded Lok Sabha Daily Intelligence Scheduler
Runs everyday at 08:00 AM IST to execute the minimal 4-call news & social media impact pipeline.
"""
import schedule
import time
import subprocess
import os
import sys

def job():
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Triggering daily 8:00 AM pipeline...")
    script_path = os.path.join(os.path.dirname(__file__), "daily_pipeline_job.py")
    result = subprocess.run([sys.executable, script_path], capture_output=True, text=True)
    print("STDOUT:\n", result.stdout)
    if result.stderr:
        print("STDERR:\n", result.stderr)

# Schedule for 08:00 AM every day
try:
    import schedule
    schedule.every().day.at("08:00").do(job)
    print("Daily 08:00 AM pipeline scheduler initialized. Waiting for trigger...")
    while True:
        schedule.run_pending()
        time.sleep(30)
except ImportError:
    # Standard fallback loop without external pip packages
    print("Running standard lightweight 08:00 AM daemon...")
    last_run_day = None
    while True:
        now = time.localtime()
        if now.tm_hour == 8 and now.tm_min == 0 and last_run_day != now.tm_mday:
            last_run_day = now.tm_mday
            job()
        time.sleep(25)
