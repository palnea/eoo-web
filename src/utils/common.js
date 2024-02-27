/**
 * Filters out properties with null values from an object.
 *
 * @param obj - The ref object to filter.
 * @returns {object} - A new object with non-null values.
 */
export const filterNullValues = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== null)
  );
};

export const getAcademicYear = (yearZero, startMonth) => {
  const currentMonth = new Date().getMonth() + 1; // Adding 1 because months are 0-indexed
  const currentYear = new Date().getFullYear();
  return currentMonth < startMonth ? currentYear - yearZero - 1 : currentYear - yearZero + 1;
}

export const mapClassOptions = (data) => {
  return data.map(({ id, year_zero, branch }) => {
    const academicYear = getAcademicYear(year_zero, 9);
    return {
      title: `${academicYear}-${branch}`,
      value: id
    };
  });
}
