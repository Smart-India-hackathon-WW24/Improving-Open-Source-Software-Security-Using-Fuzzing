# main.py
from fuzzer import Fuzzer
from adaptive_fuzz import AdaptiveFuzzer
from crash_handler import CrashHandler
from coverage import CoverageAnalyzer
from mutation import mutate_pdf
from logging_server import app
import threading

# Initialize components
fuzzer = Fuzzer()
adaptive_fuzzer = AdaptiveFuzzer(fuzzer)
crash_handler = CrashHandler()
coverage_analyzer = CoverageAnalyzer()

# Start Flask server in a separate thread
def start_server():
    app.run(debug=True, port=5000)

threading.Thread(target=start_server).start()

# Main fuzzing loop
while True:
    input_data = adaptive_fuzzer.generate_input()
    crash_data = fuzzer.run(input_data)

    if crash_data:
        severity = crash_handler.classify_crash(crash_data)
        crash_handler.log_crash(crash_data, severity)
    
    coverage_analyzer.update_coverage(input_data)
