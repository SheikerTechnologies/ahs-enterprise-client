import { crudHandlers } from "./adminCrud";
import { parseService, parseClient, type ServiceInput, type ClientInput } from "./adminContent";
import { ServiceModel } from "./models/Service";
import { ClientModel } from "./models/Client";

export const serviceHandlers = crudHandlers<ServiceInput>({
  model: ServiceModel,
  parse: parseService,
  paths: ["/", "/services"],
  duplicateMessage: "A service with this code already exists.",
  keepIfBlank: ["code"],
  prepareCreate: async (data, model) => {
    if (data.code) return data;
    const all = (await model.find({}, { code: 1 }).lean()) as { code: string }[];
    const max = all.reduce((m, s) => Math.max(m, Number(/S(\d+)/.exec(s.code)?.[1] ?? 0)), 0);
    return { ...data, code: `S${max + 1}` };
  },
});

export const clientHandlers = crudHandlers<ClientInput>({
  model: ClientModel,
  parse: parseClient,
  paths: ["/", "/clients"],
  duplicateMessage: "A client with this short name already exists.",
});
