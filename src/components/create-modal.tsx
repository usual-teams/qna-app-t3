import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Transition, Dialog } from "@headlessui/react";

import { useZodForm } from "@utils/form";
import { api } from "@utils/api";
import { addTalkSessionSchema } from "@utils/zodSchema";

const CreateModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const mutation = api.talkSession.addTalkSession.useMutation({
    onError(error) {
      setError(error.message);
    },
    onSuccess(data) {
      router.push(`/talk-session/${data.id}`);
    },
  });

  const form = useZodForm({
    schema: addTalkSessionSchema,
    defaultValues: {
      name: "",
    },
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create a Talk Session
                </Dialog.Title>
                <form
                  onSubmit={form.handleSubmit(
                    async (values) => await mutation.mutateAsync(values)
                  )}
                  className="mt-4 flex flex-col gap-4"
                >
                  <input
                    {...form.register("name")}
                    placeholder="Talk Session Name"
                    className="relative block w-full flex-grow appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  {error !== "" && <p className="text-red-500">{error}</p>}

                  <div className="flex justify-between gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded bg-indigo-100 px-4 py-2 align-middle text-sm font-semibold text-indigo-900 hover:bg-indigo-200"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded bg-[#461091] px-4 py-2 align-middle text-sm font-semibold text-white hover:bg-[#2e026d]"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateModal;
