import { Color, generate } from "./generate";

it('generates 25 cards', () => {
  const colors = generate('')
  expect(colors).toHaveLength(5)
  expect(colors[0]).toHaveLength(5)

  const flat = colors.flatMap(c => c)
  expect(flat).toHaveLength(25)
  expect(flat.filter(c => c === Color.BLACK)).toHaveLength(1)
  expect(flat.filter(c => c === Color.YELLOW)).toHaveLength(7)
  expect(flat.filter(c => c === Color.RED).length == 9).toBe(true)
  expect(flat.filter(c => c === Color.BLUE).length == 8).toBe(true)
})