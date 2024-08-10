import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";
import { Button } from "./Button";
import { expect } from "@storybook/jest";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button123",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    backgrounds: {
      values: [
        { name: "红牛刚刚", value: "red" },
        { name: "lanaln ", value: "blue" },
      ],
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "text" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};

export const Test: Story = {
  args: {
    primary: false,
    label: "Button",
  },
};

export const Guang: Story = {
  args: {
    label: "光光光",
    size: "large",
    backgroundColor: "green",
  },
  render(args, meta) {
    const list = meta.loaded.list;
    return (
      <div>
        <div>{list.join(",")}</div>
        <button>aaaa</button>
        <Button {...args} />
        <button>bbb</button>
      </div>
    );
  },
  // 组件渲染完直接执行
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.getByRole("button", {
      name: /光光光/i,
    });
    await userEvent.click(btn);

    await expect(btn.textContent).toEqual("光光光1");
    await expect(btn.style.backgroundColor).toEqual("green");
  },
  loaders: [
    async () => {
      await "mock fetch data";
      return {
        list: ["a", "b", "c"],
      };
    },
  ],
};
