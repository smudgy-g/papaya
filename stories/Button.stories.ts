import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/shared/Button'

// Create category folder
const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button
}

export default meta 
type Story = StoryObj<typeof Button>

// create story
// export const Test: Story = {
//   <Button handleClick={() => console.log('I got clicked')}>
//     <span>Click Me!</span>
//   </Button>
// }

export const Default:Story = {
  args: {
    children: `<span>Click Me!</span>`,
    handleClick: () => console.log('i got clicked')
  }
}