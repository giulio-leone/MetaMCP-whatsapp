import type { WhatsAppManager } from "./manager.js";
import { toolDescriptions, toolSchemas, type ToolName } from "./toolSchemas.js";
import { buildToolDefinitions, parseToolArgs, type ToolDefinition, type ToolHandler, type ToolRegistry } from "@meta-mcp/core";

export type { ToolDefinition, ToolHandler, ToolRegistry };

export const createToolRegistry = (manager: WhatsAppManager): ToolRegistry<ToolName> => {
  const handlers: Record<ToolName, ToolHandler> = {
    wa_send_text: async (args) => manager.sendText(parseToolArgs(toolSchemas.wa_send_text, args)),
    wa_send_template: async (args) => manager.sendTemplate(parseToolArgs(toolSchemas.wa_send_template, args)),
    wa_send_image: async (args) => manager.sendImage(parseToolArgs(toolSchemas.wa_send_image, args)),
    wa_send_video: async (args) => manager.sendVideo(parseToolArgs(toolSchemas.wa_send_video, args)),
    wa_send_document: async (args) => manager.sendDocument(parseToolArgs(toolSchemas.wa_send_document, args)),
    wa_send_location: async (args) => manager.sendLocation(parseToolArgs(toolSchemas.wa_send_location, args)),
    wa_send_contact: async (args) => manager.sendContact(parseToolArgs(toolSchemas.wa_send_contact, args)),
    wa_mark_message_as_read: async (args) =>
      manager.markMessageAsRead(parseToolArgs(toolSchemas.wa_mark_message_as_read, args)),
    wa_get_business_profile: async (args) =>
      manager.getBusinessProfile(parseToolArgs(toolSchemas.wa_get_business_profile, args)),
  };

  const definitions = buildToolDefinitions(toolSchemas, toolDescriptions) as ToolDefinition<ToolName>[];

  return { definitions, handlers };
};

export type WhatsAppToolRegistry = ToolRegistry<ToolName>;
