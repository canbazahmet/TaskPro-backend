import { env } from '../utils/env.js';
import { SMTP } from '../constants/SMPT.js';

export const sendEmail = async (options) => {
  try {
    const apiKey = env(SMTP.BREVO_API_KEY);

    const payload = {
      sender: {
        email: options.from,
        name: 'TaskPro',
      },
      to: [
        {
          email: options.to,
        },
      ],
      subject: options.subject,
      htmlContent: options.html,
    };

    console.log('Sending email via Brevo API:', {
      to: options.to,
      from: options.from,
      subject: options.subject,
    });

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Brevo API error response:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      });
      throw new Error(
        `Brevo API error (${response.status}): ${responseData.message || response.statusText}`,
      );
    }

    console.log('Email sent successfully:', responseData);
    return responseData;
  } catch (error) {
    console.error('Email sending error:', {
      message: error.message,
      stack: error.stack,
      to: options.to,
      from: options.from,
    });
    throw error;
  }
};
