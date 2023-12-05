import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../components/shared/CheckBox'

// Create category folder
const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  tags: ['autodocs'],
}


export default meta 
type Story = StoryObj<typeof Checkbox>

export const Default:Story = {
  args: {
    label: "Allergies?",
    name: "allergies"
  }
}
