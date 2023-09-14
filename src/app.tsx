import { Github, Wand2 } from 'lucide-react';
import { useCompletion } from 'ai/react';

import { Button } from "@/components/ui/button";
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Slider } from './components/ui/slider';

import { VideoInputForm } from './components/video-input-form';
import { PromptSelect } from './components/prompt-select';
import { useState } from 'react';

export function App() {
  const defaultTemperature = 0.5;
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return (
    <div className='min-h-screen flex flex-col'>
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">CVC.AI</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💙
            <a
              className='underline'
              href="https://avilyrs.github.io/portfolio/"
              target="_blank"
            >
              {' '}
              as/portfolio
            </a>
          </span>

          <Separator
            orientation='vertical'
            className='h-6'
          />

          <Button variant='outline'>
            <Github className='w-4 h-4 mr-2' />
            Github
          </Button>
        </div>
      </div>

      <main className='flex flex-1 p-6 gap-6'>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea
              value={input}
              onChange={handleInputChange}
              className='resize-none p-5 leading-relaxed'
              placeholder='Inclua o prompt para a IA...'
            />
            <Textarea
              value={completion}
              className='resize-none p-5 leading-relaxed'
              placeholder='Resultado gerado pela IA'
              readOnly
            />
          </div>

          <p className='text-sm text-muted-foreground'>
            Lembre-se: você pode utilizar a variável <code className='text-blue-800'>{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da  transcrição do vídeo selecionado
          </p>
        </div>

        <aside className='w-80 space-y-6'>
          <VideoInputForm
            onVideoUploaded={setVideoId}
          />

          <Separator />

          <form
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            <div
              className='space-y-2'
            >
              <Label>Prompt</Label>
              <PromptSelect
                onPromptSelected={setInput}
              />

              <span className='text-xs block text-muted-foreground italic'>
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <div
              className='space-y-2'
            >
              <Label>Modelo</Label>
              <Select defaultValue='gpt3.5' disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className='text-xs block text-muted-foreground italic'>
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div
              className='space-y-4'
            >
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                defaultValue={[defaultTemperature]}
                onValueChange={value => setTemperature(value[0])}
              />

              <span className='text-xs block text-muted-foreground italic leading-relaxed'>
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button
              type='submit'
              className='w-full'
              disabled={isLoading || !videoId}
            >
              Executar
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
