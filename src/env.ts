import { z } from 'zod';

export const envVariables = z.object({
  DATABASE_URL: z.string().url(),
  DISCORD_TOKEN: z.string(),
  CLIENT_ID: z.string(),
  GUILD_ID: z.string(),
  MOD_ROLE_ID: z.string(),
  BARRED_ROLE_ID: z.string(),
  BARRED_MESSAGE: z
    .string()
    .optional()
    .default(
      'You have been barred from creating tickets. This is likely due to abusive or spam like behavior when using the ticket system.\n Please reach out directly to the mods for your concern.',
    ),
  // TICKET_TYPES:
  GENERATED_TICKET_TYPE: z.string().optional().default('general'),
  GENERATED_MESSAGE: z.string().optional().default('{{user}}, {{creator}} created a ticket. <@&>'),
  LOCK_TIME: z.number().default(10000),
  BUTTONS_MESSAGE: z.string().optional().default('Click to open a ticket!'),
  TICKET_CHANNEL_ID: z.string(),
  AUTO_ARCHIVE_DURATION: z.number().optional().default(10080),
  ANONYMOUS_USER: z.string().optional().default('The string to show on anon messages'),
  LOG_CHANNEL_ID: z.string(),

  NODE_ENV: z.enum(['production', 'dev']).optional().default('dev'),
});

export const env = envVariables.parse(process.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
