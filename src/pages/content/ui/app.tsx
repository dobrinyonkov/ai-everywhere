import { useEffect, useState, useRef } from 'react';
import { stream } from './utils/stream';
import { useHistory } from './hooks/useHistory';
import { getTwitterPrompts, preDefinedPrompts } from './prompts/twitter';
import { useTabs } from './hooks/useTabs';

const MAGIC_KEY = '`';

type FreeTextProps = {
  message: string;
  setMessage: (message: string) => void;
  onAsk: () => void;
};

const FreeText = ({ message, setMessage, onAsk }: FreeTextProps) => (
  <input
    value={message}
    type="text"
    placeholder="Ask something the AI, about the selection..."
    className="min-w-full input input-bordered text-blue-200 input-primary"
    onKeyDown={e => {
      if (e.key === 'Enter') {
        onAsk();
      }
      e.stopPropagation();
    }}
    onChange={e => setMessage(e.target.value)}
  />
);

type PreDefinedPromptsProps = {
  message: string;
  setMessage: (message: string) => void;
  onAsk: () => void;
};

const PreDefinedPrompts = ({ message, setMessage, onAsk }: PreDefinedPromptsProps) => (
  <>
    <ul tabIndex={0} className="rounded-box w-full bg-base-100 p-2 shadow">
      {preDefinedPrompts.map((command, index) => (
        <>
          <li key={command} className="cursor-pointer hover:bg-slate-900 p-2">
            <a onClick={() => setMessage(command)}>{command}</a>
          </li>
          {index < preDefinedPrompts.length - 1 && (
            <div style={{ height: '0.025rem' }} className="h mt-1 bg-slate-500" />
          )}
        </>
      ))}
    </ul>
    <FreeText message={message} setMessage={setMessage} onAsk={onAsk} />
  </>
);

export default function App() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const { getHistory, resetHistory, addMessages } = useHistory();
  const { tab, changeTab } = useTabs('Free Text');

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const reset = () => {
      setMessage('');
      setResponse('');
      resetHistory();
    };

    const showAtSelection = () => {
      const selection = window.getSelection();
      if (selection?.toString()) {
        reset();
        setText(selection.toString());
        modalRef.current?.showModal();
      }
    };

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === MAGIC_KEY) {
        showAtSelection();
      }
    });
  }, [resetHistory]);

  const onAsk = () => {
    let accumulated = '';
    const prompt = getTwitterPrompts(text, message);
    const history = getHistory();
    const metadata = { url: window.location.href };
    const onMessage = (data: string) => {
      accumulated += data;
      setResponse(accumulated);
    };
    stream(prompt, history, metadata, onMessage);
    addMessages([
      {
        role: 'human',
        text: prompt,
      },
      {
        role: 'system',
        text: accumulated,
      },
    ]);
  };

  return (
    <dialog id="my_modal_1" className="modal text-white" ref={modalRef}>
      <div className="modal-box bg-slate-950 grid grid-cols-1 gap-5">
        <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
          <p>{text}</p>
        </div>

        <div role="tablist" className="tabs tabs-bordered">
          <a role="tab" className={`tab ${tab === 'Free Text' ? 'active' : ''}`} onClick={() => changeTab('Free Text')}>
            Free Text
          </a>
          <a
            role="tab"
            className={`tab ${tab === 'Predefined Prompts' ? 'active' : ''}`}
            onClick={() => changeTab('Predefined Prompts')}>
            Predefined Prompts
          </a>
        </div>

        {tab === 'Free Text' ? (
          <FreeText message={message} setMessage={setMessage} onAsk={onAsk} />
        ) : (
          <PreDefinedPrompts message={message} setMessage={setMessage} onAsk={onAsk} />
        )}

        <button className="btn" onClick={onAsk}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Ask Jarvis
        </button>

        {response && (
          <div className="bg-slate-900 p-4 rounded-lg">
            <>
              <div className="flex justify-between">
                <h2
                  className="text-lg font-bold
              ">
                  Response:
                </h2>

                <button
                  className="btn btn-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(response);
                  }}>
                  Copy
                </button>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
                <p>{response}</p>
              </div>
            </>
          </div>
        )}
      </div>
    </dialog>
  );
}
