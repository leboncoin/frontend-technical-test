import { useEffect } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postMessage } from '@/api/index'

import sentIcon from '@/assets/sent.svg'

interface Inputs {
  messageBody: string
}

interface MessageFormProps {
  authorId: number
  conversationId: number
}

export default function MessageForm({
  authorId,
  conversationId,
}: MessageFormProps) {
  const { handleSubmit, register, formState, reset } = useForm<Inputs>()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (body: string) =>
      postMessage({
        authorId,
        conversationId,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversation', authorId, conversationId],
      })
    },
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ messageBody: '' })
    }
  }, [formState, reset])

  const onSubmit: SubmitHandler<Inputs> = ({ messageBody }) => {
    mutation.mutate(messageBody)
  }

  const isButtonDisabled = !formState.isValid || mutation.isPending

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex items-center gap-4 rounded-2xl border border-grey-300 px-4 py-2 focus-within:border-grey-500"
    >
      <textarea
        rows={3}
        className="flex-1 rounded-2xl px-4 outline-none"
        placeholder="Send message"
        {...register('messageBody', { required: true })}
      />
      <button
        disabled={isButtonDisabled}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-grey-300 transition hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-grey-300"
      >
        <Image src={sentIcon} height={24} width={24} alt="send message" />
      </button>
    </form>
  )
}
