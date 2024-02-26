import { useState } from 'react';
import { Prompt } from '@/models/prompt.model';
import { getInputsFromPrompt } from '@/services/prompt.service';

const usePromptTemplateData = (promptData?: Prompt) => {
  const [promptValue, setPromptValue] = useState<string>(promptData?.promptText ?? "");
  const [inputs, setInputs] = useState<string[]>(promptData ? getInputsFromPrompt(promptData.promptText) : []);
  const [inputValues, setInputValues] = useState<string[]>(promptData?.inputs ?? []);

  return { promptValue, setPromptValue, inputs, setInputs, inputValues, setInputValues };
};

export default usePromptTemplateData;