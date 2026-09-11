import { useState } from "react";
import { sendContactMessage } from "../services/contactService";

export function useContactForm() {
  const [toast, setToast] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await sendContactMessage({
        name: (data.get("name") || "").toString(),
        email: (data.get("email") || "").toString(),
        message: (data.get("message") || "").toString(),
      });
      form.reset();
      setToast({
        type: "success",
        message: "Thanks — I'll get back to you soon.",
      });
    } catch {
      setToast({
        type: "error",
        message: "Couldn't send that — please email me directly instead.",
      });
    }
  };

  return { toast, closeToast: () => setToast(null), onSubmit };
}
