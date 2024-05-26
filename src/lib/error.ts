export class InvalidUser extends Error {
  constructor(message: string = 'Invalid User') {
    super(message) // Call the parent Error class constructor
    this.name = 'InvalidUser' // Set the error name for clarity
  }
}
