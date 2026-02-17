import brevo from '@getbrevo/brevo';

import { env } from '../utils/env.js';
import { SMTP } from '../constants/SMPT.js';

let apiInstance = null;

const getApiInstance = () => {
  if (!apiInstance) {
    apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      env(SMTP.BREVO_API_KEY),
    );
  }
  return apiInstance;
};

export const sendEmail = async (options) => {
  const apiInstance = getApiInstance();
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = options.subject;
  sendSmtpEmail.htmlContent = options.html;
  sendSmtpEmail.sender = { email: options.from, name: 'TaskPro' };
  sendSmtpEmail.to = [{ email: options.to }];

  return await apiInstance.sendTransacEmail(sendSmtpEmail);
};
