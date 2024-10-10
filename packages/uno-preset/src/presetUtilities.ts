// @unocss-include
import { definePreset, transformerDirectives, transformerVariantGroup } from 'unocss'

export const presetUtilities = definePreset(() => {
  return {
    name: 'unocss-preset-utilities',
    content: {
      pipeline: {
        exclude: ['node_modules', '.git', 'dist', '.nx'],
      },
    },
    transformers: [transformerDirectives(), transformerVariantGroup()],
    shortcuts: {
      // size
      'size-0': 'w-0 h-0',
      'size-full': 'w-full h-full',
      'size-screen': 'w-screen h-screen',
      'size-1/2': 'w-1/2 h-1/2',
      // flex layout
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-col': 'flex flex-col',
      'flex-col-center': 'flex-center flex-col',
      'flex-col-stretch': 'flex-col items-stretch',
      'i-flex-center': 'inline-flex justify-center items-center',
      'i-flex-x-center': 'inline-flex justify-center',
      'i-flex-y-center': 'inline-flex items-center',
      'i-flex-col': 'flex-col inline-flex',
      'i-flex-col-center': 'flex-col i-flex-center',
      'i-flex-col-stretch': 'i-flex-col items-stretch',
      'flex-1-hidden': 'flex-1 overflow-hidden',
      // position layout
      'absolute-lt': 'absolute left-0 top-0',
      'absolute-lb': 'absolute left-0 bottom-0',
      'absolute-rt': 'absolute right-0 top-0',
      'absolute-rb': 'absolute right-0 bottom-0',
      'absolute-tl': 'absolute-lt',
      'absolute-tr': 'absolute-rt',
      'absolute-bl': 'absolute-lb',
      'absolute-br': 'absolute-rb',
      'absolute-x-center': 'absolute left-1/2 -translate-x-1/2',
      'absolute-y-center': 'absolute top-1/2 -translate-y-1/2',
      'absolute-center': 'absolute-x-center absolute-y-center',
      'fixed-lt': 'fixed left-0 top-0',
      'fixed-lb': 'fixed left-0 bottom-0',
      'fixed-rt': 'fixed right-0 top-0',
      'fixed-rb': 'fixed right-0 bottom-0',
      'fixed-tl': 'fixed-lt',
      'fixed-tr': 'fixed-rt',
      'fixed-bl': 'fixed-lb',
      'fixed-br': 'fixed-rb',
      'fixed-center': 'fixed-lt flex-center size-full',
      //
      'nowrap-hidden': 'overflow-hidden whitespace-nowrap',
      'ellipsis-text': 'nowrap-hidden text-ellipsis',
    },
    rules: [
      [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number.parseInt(d) / 4}rem` })],
      [/^p-(\d+)$/, match => ({ padding: `${Number.parseInt(match[1]) / 4}rem` })],
      [/^header-[1-6]$/, () => ({ 'font-weight': 700, 'letter-spacing': '0.05em', 'line-height': 1.2 })],
    ],
  }
})
