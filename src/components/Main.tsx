import UserInput from './UserInput';
import TextAnalysis from './TextAnalysis';
import Charts from './Charts';

export default function Main() {
  return (
    <main className="flex-1 w-full pt-14 pb-10 p-4">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-full">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col h-full">
          <UserInput />
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col h-full">
          <TextAnalysis />
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col h-full">
          <Charts />
        </div>
      </div>
    </main>
  );
}