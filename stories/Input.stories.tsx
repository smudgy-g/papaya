import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/shared/Input'

// Create category folder
const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  tags: ['autodocs']
}

export default meta 
type Story = StoryObj<typeof Input>

export const Default:Story = {
  args: {
    name: 'Name',
    type: 'text',
    required: false,
    placeholder: 'Enter your name'
  }
}
export const Password:Story = {
  args: {
    name: 'password',
    type: 'password',
    required: true,
    placeholder: '******'
  }
}
export const Email:Story = {
  args: {
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'you@example.com'
  }
}