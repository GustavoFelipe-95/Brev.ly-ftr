import { useForm } from "react-hook-form";
import { CustomInput } from "../systemUI/custom-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { newLinkSchema } from "../../schemas/newLinkSchema";
import { newShortenedLink } from "../../http/shorten-api";
import { useDataStoreLink } from "../../dataStore/data-store-link";

export function NewLink() {
  const { addStoreLink } = useDataStoreLink();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    watch,
    setError,
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(newLinkSchema),
    defaultValues: {
      originalLink: '',
      shortenedLink: '',
    },
  });

  const filledFields = !watch('originalLink') || !watch('shortenedLink') || Object.values(errors).length > 0;

  async function handleNewShortLink(data: any): Promise<void> {
      try {
        clearErrors();

        const response = await newShortenedLink(data);
        console.log(response);
        addStoreLink(response);

        reset();
      } catch (error: any) {
        setError('shortenedLink', {
          type: 'manual',
          message: error.message || 'An error occurred while creating the short link.',
        });
      }
  }

  return (
    <section className="flex flex-col w-full md:max-w-[380px] gap-4 bg-white rounded-lg p-4">
      <p className='text-lg m-2'>Novo Link</p>
      <form onSubmit={handleSubmit(handleNewShortLink)} className="flex flex-col m-2 gap-4">
        <CustomInput 
          labelName="Link Original"
          placeholder="www.exemplo.com.br"
          isFailure={!!errors.originalLink}
          failureMessage={errors.originalLink?.message as string}
          {...register('originalLink')} />
        <CustomInput
          labelName="Link Encurtado"
          placeholder="brev.ly/"
          isFailure={!!errors.shortenedLink}
          failureMessage={errors.shortenedLink?.message as string}
          {...register('shortenedLink')} />
        <button
          type="submit"
          disabled={filledFields || isSubmitting || isLoading}
          className="bg-blue-base text-white font-semibold py-2 rounded-md transition-colors mt-2 disabled:opacity-50 enabled:cursor-pointer enabled:hover:bg-blue-dark">
          {isSubmitting || isLoading ? 'Encurtando link...' : 'Salvar Link'}
        </button>
      </form>
    </section>
  )
}