import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/shared/Button'

// Create category folder
const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ['autodocs'],
}

export default meta 
type Story = StoryObj<typeof Button>

export const Default:Story = {
  args: {
    children: 'Click Me'
  }
}
