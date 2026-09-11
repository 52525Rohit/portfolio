import { contactApi } from "../api/contactApi";

export function sendContactMessage({ name, email, message }) {
  return contactApi.send({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });
}
