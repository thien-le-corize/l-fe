export const getName = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) {
    return "";
  }

  if (firstName && !lastName) {
    return firstName;
  }

  if (!firstName && lastName) {
    return lastName;
  }

  return `${lastName} ${firstName}`;
};
