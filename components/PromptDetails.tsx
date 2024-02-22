import React, { ChangeEvent, useState } from 'react'
import AutoResizeTextarea from './custom/AutoResizeTextarea'
import PromptInput from './PromptInput'
import { Card } from './ui/card';

const PromptDetails = () => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);

  const getInputsFromPrompt = (promptText: string): string[] => {
    // match substrings within a string that are enclosed in curly braces {}.
    const regex = /\{([^}]+)\}/g;
    const matches = promptText.match(regex);

    if (matches) return matches.map(match => match.slice(1, -1).trim());
    return [];
  }

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    // setPromptValue(e.target.value)
    setInputs(getInputsFromPrompt(e.target.value));
  }

  const handleInputChange = (index: number, value: string): void => {
    // Create a copy of the inputValues array
    const newInputValues: string[] = [...inputValues];
    // Update the value at the specified index
    newInputValues[index] = value;
    // Update the state with the new array
    setInputValues(newInputValues);
    // setValue(`inputValues.${index}`, value);
  };

  return (
    <div>
      <h1>Prompt Title</h1>
      <p>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore provident ad possimus at porro praesentium.</p>
      <div>tags</div>
      <Card>
        <h1>Prompt</h1>
        <div className='flex gap-5'>
          <div className='flex-1'>
            <AutoResizeTextarea
              placeholder='Write prompt here'
              minRows={10}
              onChange={handlePromptChange}
            />
          </div>
          {inputs.length > 0 && (
            <div className='flex-1'>
              <h2 className='mb-1'>Inputs</h2>
              <div className='flex flex-col gap-2'>
                {inputs.map((input, index) => (
                  <PromptInput
                    label={input}
                    key={index}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
      <p>Sample output</p>
    </div>
  )
}

export default PromptDetails