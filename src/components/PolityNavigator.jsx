import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  FileText,
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { sounds } from '../utils/audio';

const WRITS_DATA = [
  {
    name: 'Habeas Corpus',
    literalMeaning: '"To have the body of"',
    purpose: 'Directs the release of a person who has been detained illegally or unlawfully.',
    issuedAgainst: 'Both Public Authorities and Private Individuals.',
    notIssuedWhen: 'Detention is lawful, outside court jurisdiction, or by competent court order.',
    examTrap: '⚠️ Exam Trap: This is the ONLY writ that can be issued against private individuals in addition to public bodies.'
  },
  {
    name: 'Mandamus',
    literalMeaning: '"We Command"',
    purpose: 'Commands an activity to perform a statutory public or judicial duty they have failed or refused to perform.',
    issuedAgainst: 'Public bodies, corporations, inferior courts, and government officials.',
    notIssuedWhen: 'Against the President of India, State Governors, private individuals, or for discretionary/contractual duties.',
    examTrap: '⚠️ Exam Trap: Mandamus CANNOT be issued against the President or Governors in their official capacities.'
  },
  {
    name: 'Prohibition',
    literalMeaning: '"To Forbid"',
    purpose: 'Issued by a higher court to a lower judicial or quasi-judicial court to prevent it from exceeding its jurisdiction.',
    issuedAgainst: 'Judicial and Quasi-Judicial bodies only.',
    notIssuedWhen: 'Against administrative authorities, legislative bodies, or private individuals.',
    examTrap: '⚠️ Exam Trap: Prohibition is preventive (issued BEFORE order is made), whereas Certiorari is both preventive and curative.'
  },
  {
    name: 'Certiorari',
    literalMeaning: '"To be Certified / Informed"',
    purpose: 'Transfers a pending case or quashes an illegal order made by a lower tribunal lacking jurisdiction or violating natural justice.',
    issuedAgainst: 'Judicial, Quasi-Judicial, and Administrative authorities (post-1991 SC judgment).',
    notIssuedWhen: 'Against legislative bodies or private individuals.',
    examTrap: '⚠️ Exam Trap: In 1991, Supreme Court expanded Certiorari to cover administrative authorities affecting citizen rights.'
  },
  {
    name: 'Quo-Warranto',
    literalMeaning: '"By What Authority / Warrant"',
    purpose: 'Inquires into the legality of a claim by a person to a public office to prevent illegal usurpation of public posts.',
    issuedAgainst: 'Substantive public offices created by statute or constitution.',
    notIssuedWhen: 'Against private offices, ministerial offices, or temporary contractual posts.',
    examTrap: '⚠️ Exam Trap: Unlike other writs, ANY interested citizen (not necessarily the aggrieved person) can seek Quo-Warranto (Locus Standi is relaxed).'
  }
];

const EMERGENCY_COMPARISON = [
  {
    type: 'National Emergency',
    article: 'Article 352',
    grounds: 'War, External Aggression, or Armed Rebellion (44th Amendment replaced "Internal Disturbance").',
    parliamentaryApproval: 'Within 1 month by Special Majority (2/3 present & voting + majority of total membership).',
    duration: '6 months at a time; indefinite renewals with parliamentary approvals.',
    effectOnRights: 'Article 19 automatically suspended only under War/External Aggression (not Armed Rebellion). Articles 20 & 21 CANNOT be suspended.'
  },
  {
    type: "President's Rule (State Emergency)",
    article: 'Article 356 & 365',
    grounds: 'Failure of Constitutional Machinery in State (Art 356) or failure to comply with Union directions (Art 365).',
    parliamentaryApproval: 'Within 2 months by Simple Majority.',
    duration: '6 months at a time; maximum 3 years (requires EC certificate of election impediment beyond 1 year).',
    effectOnRights: 'No effect on citizen Fundamental Rights. State legislature suspended or dissolved.'
  },
  {
    type: 'Financial Emergency',
    article: 'Article 360',
    grounds: 'Threat to financial stability or credit of India or any part of territory.',
    parliamentaryApproval: 'Within 2 months by Simple Majority.',
    duration: 'Continues indefinitely until revoked by President; no repeated parliamentary approval needed.',
    effectOnRights: 'No effect on Fundamental Rights. Salaries of Union/State officials including SC/HC judges can be reduced.'
  }
];

export default function PolityNavigator() {
  const [activeTab, setActiveTab] = useState('writs'); // 'writs', 'emergency', 'rights'
  const [selectedWrit, setSelectedWrit] = useState(WRITS_DATA[0]);

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-1">
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            Indian Constitutional Law Engine
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Articles, Writs & Emergency Navigator
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => { setActiveTab('writs'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'writs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            5 Constitutional Writs
          </button>
          <button
            onClick={() => { setActiveTab('emergency'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'emergency' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Emergency Provisions (352/356/360)
          </button>
        </div>
      </div>

      {/* WRITS DEEP DIVE */}
      {activeTab === 'writs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Writ Selector Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Articles 32 (Supreme Court) & 226 (High Courts):
            </p>
            {WRITS_DATA.map((w) => {
              const isSelected = selectedWrit.name === w.name;
              return (
                <div
                  key={w.name}
                  onClick={() => { setSelectedWrit(w); sounds.playClick(); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{w.name}</h4>
                      <p className="text-xs text-amber-700 italic font-mono">{w.literalMeaning}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition ${isSelected ? 'text-amber-600 translate-x-1' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Drilldown Card */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  WRIT ANALYSIS
                </span>
                <h4 className="text-xl font-bold text-white">{selectedWrit.name}</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                {selectedWrit.literalMeaning}
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <strong className="text-teal-400 block mb-0.5">🎯 Constitutional Purpose:</strong>
                <p className="text-slate-200">{selectedWrit.purpose}</p>
              </div>

              <div>
                <strong className="text-indigo-400 block mb-0.5">🏛️ Issued Against:</strong>
                <p className="text-slate-200">{selectedWrit.issuedAgainst}</p>
              </div>

              <div>
                <strong className="text-rose-400 block mb-0.5">🚫 Cannot Be Issued When:</strong>
                <p className="text-slate-300">{selectedWrit.notIssuedWhen}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 font-sans mt-3">
                {selectedWrit.examTrap}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMERGENCY PROVISIONS COMPARISON */}
      {activeTab === 'emergency' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900">
            <strong>Key Distinction:</strong> 44th Constitutional Amendment (1978) made Article 20 (Protection against conviction) and Article 21 (Right to Life & Liberty) completely un-suspendable under any emergency.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EMERGENCY_COMPARISON.map((em, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {em.article}
                  </span>
                  <Scale className="w-4 h-4 text-slate-400" />
                </div>

                <h4 className="text-sm font-bold text-slate-900">{em.type}</h4>

                <div className="space-y-2 text-xs text-slate-600">
                  <div>
                    <strong className="text-slate-900 block text-[11px]">Grounds:</strong>
                    <p>{em.grounds}</p>
                  </div>

                  <div>
                    <strong className="text-slate-900 block text-[11px]">Approval:</strong>
                    <p>{em.parliamentaryApproval}</p>
                  </div>

                  <div>
                    <strong className="text-slate-900 block text-[11px]">Duration:</strong>
                    <p>{em.duration}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-indigo-700">
                    <strong>Effect on Rights:</strong> {em.effectOnRights}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
