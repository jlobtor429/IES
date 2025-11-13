import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedContent } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        text: {
            type: Type.STRING,
            description: 'El texto educativo sobre la asignatura.'
        },
        questions: {
            type: Type.ARRAY,
            description: 'Una lista de preguntas de comprensión lectora.',
            items: {
                type: Type.OBJECT,
                properties: {
                    questionText: {
                        type: Type.STRING,
                        description: 'El texto de la pregunta.'
                    },
                    options: {
                        type: Type.ARRAY,
                        description: 'Una lista de 4 posibles respuestas.',
                        items: {
                            type: Type.STRING
                        }
                    },
                    correctAnswerIndex: {
                        type: Type.INTEGER,
                        description: 'El índice de la respuesta correcta (0-3).'
                    }
                },
                 required: ['questionText', 'options', 'correctAnswerIndex']
            }
        }
    },
    required: ['text', 'questions']
};

export const generateEducationalContent = async (course: string, subject: string): Promise<GeneratedContent> => {
    const prompt = `
      Eres un experto en la creación de material didáctico para estudiantes de Educación Secundaria Obligatoria (ESO) en España. Tu tarea es generar contenido para la asignatura de '${subject}' del curso '${course}'.

      Por favor, sigue estas instrucciones y devuelve el resultado en formato JSON:

      1.  **Texto Principal**: Escribe un texto informativo y atractivo de aproximadamente 300-400 palabras sobre un tema fundamental de la asignatura y curso especificados. El lenguaje debe ser claro, conciso y adecuado para la edad de los alumnos.
      2.  **Preguntas de Comprensión Lectora**: Basándote exclusivamente en el texto anterior, crea 5 preguntas de opción múltiple (tipo test).
      3.  **Opciones de Respuesta**: Para cada pregunta, proporciona 4 opciones de respuesta. Solo una de ellas debe ser correcta. Las otras tres deben ser distractores plausibles.
      4.  **Respuesta Correcta**: Indica claramente el índice de la respuesta correcta para cada pregunta, donde el índice de la primera opción es 0, el de la segunda es 1, y así sucesivamente.

      Asegúrate de que la respuesta sea un único objeto JSON válido que se ajuste al esquema proporcionado.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedContent: GeneratedContent = JSON.parse(jsonText);

        // Basic validation
        if (!parsedContent.text || !parsedContent.questions || !Array.isArray(parsedContent.questions)) {
            throw new Error("Invalid content structure received from API.");
        }
        
        return parsedContent;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
};
