import { sendHelpEmail } from '../services/sendEmail.js';

export const sendEmailController = async (req, res) => {
  const { email, comment } = req.body;
  const { name } = req.user;
  await sendHelpEmail(email, comment, name);
  res.status(200).json({
    status: 200,
    message: 'Help request email sent successfully',
    data: { email, name },
  });
};
