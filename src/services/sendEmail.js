import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import createHttpError from 'http-errors';

import { TEMPLATES_DIR } from '../constants/templatesDir.js';
import { sendEmail } from '../utils/sendEmail.js';
import { env } from '../utils/env.js';
import { SMTP } from '../constants/SMTP.js';

export const sendHelpEmail = async (email, comment, name) => {
  try {
    const displayName = name || 'Dear Friend';

    const needHelpTemplatePath = path.join(TEMPLATES_DIR, 'needHelp.html');

    const templateSource = (await fs.readFile(needHelpTemplatePath)).toString();

    const template = handlebars.compile(templateSource);
    const html = template({
      name: displayName,
      comment,
    });

    await sendEmail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: 'Help Request',
      html,
    });
  } catch (error) {
    throw createHttpError(500, 'Failed to send help email');
  }
};
