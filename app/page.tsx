import Header from '@/components/Header';
import Summary from '@/components/Summary';
import Notable from '@/components/Notable';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';

export default function Page() {
  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-10">
      <Header />
      <Summary />
      <Notable />
      <Experience />
      <Skills />
      <Education />
      <footer className="animate-in delay-7 pt-6 border-t border-border-faint">
        <p className="text-xs text-ink-faint">
          &copy; {new Date().getFullYear()} Nick Hess
        </p>
      </footer>
    </main>
  );
}
