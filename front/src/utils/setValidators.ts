const MAX_REPS = 1000
const MAX_WEIGHT = 10000
const INT_REGEX = /^-?[0-9]+$/;
const FLOAT_REGEX = /^[-]?\d+(\.\d+)?$/

export const validateReps = (value: string): string => {
  // validate reps input
  const reps = parseInt(value.trim());
  // console.log(reps);
  if (isNaN(reps) || !INT_REGEX.test(value)) {
    return "Must be a valid value.";
  } else if (reps < 1) {
    return "Reps must be at least 1.";
  } else if (reps > MAX_REPS) {
    return "Reps can't be over 1000.";
  }
  return ""; // no error.
}

export const validateWeight = (value: string): string => {
  // validate weight input
  const weight = parseFloat(value.trim());
  if (isNaN(weight) || !FLOAT_REGEX.test(value)) {
    return "Must be a valid value.";
  } else if (weight <= 0) {
    return "Weight must be greater than 0.";
  } else if (weight > MAX_WEIGHT) {
    return "Weight can't be over 10000kg";
  }
  return "" // no error.
}
