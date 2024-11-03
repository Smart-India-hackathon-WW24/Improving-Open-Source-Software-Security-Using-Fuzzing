# Fuzzing Project
This project implements a fuzzing system for analyzing the security of an application, specifically targeting Sumatra PDF Reader.

## Structure
- `main.py`: Main controller for the fuzzing engine.
- `fuzzer.py`: Contains the core fuzzing logic.
- `adaptive_fuzz.py`: Adaptive fuzzing logic.
- `crash_handler.py`: Handles crash triage and logging.
- `coverage.py`: Tracks code coverage.
- `mutation.py`: Template for mutating PDF files.

## Running the Project
1. Install dependencies: `pip install flask`
2. Run `main.py` to start the backend.
3. Access the frontend at `localhost:5000`.
