'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

export function ReservationSection({ t }: { t: Dictionary }) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${today.getFullYear()}-${month}-${day}`);
  }, []);

  async function copyRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = `${t.reserve.request}\n${t.reserve.name}: ${name}\n${t.reserve.guests}: ${guests}\n${t.reserve.date}: ${date}\n${t.reserve.time}: ${time}`;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
      alert(message);
    }
  }

  return <section id="reserve" className="reservation-section">
    <div className="reservation-inner section-shell">
      <div className="reservation-copy"><span className="section-kicker"><span className="small-flower">✳</span>{t.reserve.eyebrow}</span><h2>{t.reserve.title}</h2><p>{t.reserve.body}</p><div className="reservation-sun">✺</div></div>
      <form className="reservation-form" onSubmit={copyRequest}>
        <label>{t.reserve.name}<input type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required placeholder="—" /></label>
        <div className="form-two">
          <label>{t.reserve.guests}<select value={guests} onChange={e => setGuests(e.target.value)}>{Array.from({ length: 12 }, (_, i) => <option key={i} value={i+1}>{i+1}</option>)}</select></label>
          <label>{t.reserve.date}<input type="date" required value={date} min={minDate} onChange={e => setDate(e.target.value)} /></label>
        </div>
        <label>{t.reserve.time}<select value={time} onChange={e => setTime(e.target.value)}>{Array.from({ length: 25 }, (_, i) => { const totalMinutes = 12 * 60 + i * 30; const value = `${Math.floor(totalMinutes/60).toString().padStart(2,'0')}:${(totalMinutes%60).toString().padStart(2,'0')}`; return <option value={value} key={value}>{value}</option>; })}</select></label>
        <button className="reserve-submit" type="submit">{copied ? <Check size={21}/> : <Copy size={19}/>} {t.reserve.create}<ArrowUpRight size={18}/></button>
        {copied && <p className="copied-note" role="status">{t.reserve.copied}</p>}
        <p className="form-note">{t.reserve.footnote}</p>
      </form>
    </div>
  </section>;
}
