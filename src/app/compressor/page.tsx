import { ModeToggle } from '@/components/mode-toggle';
import { Card } from '@/components/ui/card';
import Dropzone from '@/components/dropzone';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
export default function Converter() {
  return (
    <main className='flex h-screen p-2 '>
      <Card className='flex w-full h-full flex-col relative'>
        <div className='w-full flex justify-between'>
          {/* Header Menu */}
          <Header />
          {/* Header Menu */}

          <div>
            <ModeToggle />
          </div>
        </div>

        <div className='flex flex-row h-full w-full border-t'>
          {/* Side Bar */}
          <Sidebar />
          {/* Side Bar */}

          {/* Main App */}
          <div className='border-l h-full w-full px-12 py-6'>
            {/* <Dropzone /> */}
          </div>
          {/* Main App */}
        </div>
      </Card>
    </main>
  );
}
