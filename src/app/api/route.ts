"use server";

import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import type { ChatGPTFunction } from "../chat/_chat/types/openai";

const functions: ChatGPTFunction[] = [
  {
    name: "send_email",
    description: "Send an email to a user",
    parameters: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description:
            "The email address of the recipient. You should always ask the user if you don't know the email address.",
        },
        subject: {
          type: "string",
          description: "The subject of the email",
        },
        body: {
          type: "string",
          description: "The body of the email. Must be written in HTML.",
        },
      },
      required: ["email", "subject", "body"],
    },
  },
  {
    name: "get_vegetation_days",
    description:
      "Analyze the vegetation days, get the vegetation days and stadistics",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "growing_degree_days_accumulated",
    description: "Analyze the dregree days acumulated",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "air_quality",
    description: "Analyze the air quality",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "cold_index",
    description: "Analyze the cold index, indice del frio",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "heavy_rain_days",
    description: "Analyze the heavy rain days",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "drought_index",
    description: "Analyze the drought index, indice de sequia",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "evapotranspiration_1h",
    description: "Analyze the evapotranspiration",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "fosberg_fire_weather_index",
    description: "Analisa el indice de fuego de fosberg",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "heat_index",
    description: "Analyze the heat index, indice de calor",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "rain_water",
    description: "Analyze the rain water, porcentaje de lluvia",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "salinity",
    description: "Analyze the salinity, salinidad del agua",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "soil_moisture_index",
    description: "Analyze the soil moisture index, indice de humedad del suelo",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "soil_type",
    description: "Analyze the soil type, tipo de suelo",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "volumetric_soil_water",
    description:
      "Analyze the volumetric soil water, agua volumetrica del suelo",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "t_-15cm",
    description: "Analisa la temperatura semanal",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "total_cloud_cover",
    description: "Analyze the total cloud cover, cobertura de nubes",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
  {
    name: "wet_bulb_t_2m",
    description: "Analisa la temperatura de bulbo humedo",
    parameters: {
      type: "object",
      properties: {
        instruction: {
          type: "string",
          description: "The user instruction to call the function",
        },
      },
      required: ["instruction"],
    },
  },
];

export async function POST(request: Request) {
  // Get formData from request
  const body = await request.json();
  const { messages, api_key } = body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY ?? api_key,
  });

  if (configuration.apiKey === undefined) {
    console.log("No API key provided.");
    return NextResponse.json(
      {
        message: "No API key provided.",
      },
      {
        status: 401,
      },
    );
  }

  const openai = new OpenAIApi(configuration);

  try {
    console.log("Creating chat completion...");
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant. You may need to call functions to complete your tasks. You can only call functions what you can understand. Always answer in markdown. Current date:${new Date().toLocaleDateString("es-MX")}`,
        },
        ...messages,
      ],
      functions,
      temperature: 0.6,
      max_tokens: 1000,
      /* function_call: "auto" */
    });
    console.log("Chat completion created.");
    return NextResponse.json(completion.data.choices[0].message);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      return NextResponse.json({
        message: error.response.data?.error?.message ?? "Unknown error",
      });
    }
    console.log(error);
    return NextResponse.json({
      message: error.error?.message ?? "Unknown error",
    });
  }
}
