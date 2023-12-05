import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '../components/shared/DatePicker'

// Create category folder
const meta: Meta<typeof DatePicker> = {
  title: "Date Picker",
  component: DatePicker,
  tags: ['autodocs'],
}


export default meta 
type Story = StoryObj<typeof DatePicker>

export const Default:Story = {
  args: {
    label: "Date of event",
    name: "event-date"
  }
}
