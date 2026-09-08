import React from 'react';
import { AIModel } from '../../types';
import { X, Check, AlertTriangle, Cpu, ExternalLink } from 'lucide-react';

interface ModelComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  models: AIModel[];
  onRemoveModel: (modelId: string) => void;
  onSelectModelDetail: (modelId: string) => void;
}

export const ModelComparisonModal: React.FC<ModelComparisonModalProps> = ({
  isOpen,
  onClose,
  models,
  onRemoveModel,
  onSelectModelDetail,
}) => {
  if (!isOpen) return null;

  const benchmarkKeys = ['SWE-bench Verified', 'AIME 2024', 'MATH-500', 'GPQA Diamond', 'MMLU-Pro'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-6xl bg-zinc-950 border border-zinc-700/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-zinc-100 font-sans">
                Side-by-Side Model Architecture & Benchmark Matrix
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Comparing {models.length} frontier models across specs, economics, and verified capabilities
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Content */}
        {models.length === 0 ? (
          <div className="py-20 text-center text-zinc-500">
            <p className="text-sm font-medium">No models currently selected for comparison.</p>
            <p className="text-xs mt-1">Select 2 or more models from the Models Directory to compare.</p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto p-6">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="p-3.5 bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 uppercase w-48 sticky left-0 z-10">
                    Specification
                  </th>
                  {models.map((model) => (
                    <th
                      key={model.id}
                      className="p-4 bg-zinc-900/60 border border-zinc-800 text-zinc-100 min-w-[260px] relative"
                    >
                      <button
                        onClick={() => onRemoveModel(model.id)}
                        className="absolute top-3 right-3 p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Remove model from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="text-base font-bold text-zinc-100 flex items-center gap-1.5">
                        <span>{model.name}</span>
                      </div>
                      <div className="text-xs font-mono text-emerald-400 mt-0.5">{model.developer}</div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectModelDetail(model.id);
                        }}
                        className="mt-2 text-[11px] font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        Full Model Report <ExternalLink className="w-3 h-3" />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {/* Model Type */}
                <tr>
                  <td className="p-3 bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-zinc-400 font-medium sticky left-0 z-10">
                    Classification
                  </td>
                  {models.map((model) => (
                    <td key={model.id} className="p-3 border border-zinc-800 text-zinc-300 font-sans">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-xs font-mono text-zinc-200 border border-zinc-700">
                        {model.modelType}
                      </span>
                    </td>
                  ))}
                </tr>


                {/* Parameters & Architecture */}
                <tr>
                  <td className="p-3 bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-zinc-400 font-medium sticky left-0 z-10">
                    Parameters / Footprint
                  </td>
                  {models.map((model) => (
                    <td key={model.id} className="p-3 border border-zinc-800 text-zinc-200 font-mono text-xs">
                      {model.parameters}
                    </td>
                  ))}
                </tr>

                {/* Context Window */}
                <tr>
                  <td className="p-3 bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-zinc-400 font-medium sticky left-0 z-10">
                    Context Window
                  </td>
                  {models.map((model) => (
                    <td key={model.id} className="p-3 border border-zinc-800 text-zinc-200 font-mono text-xs font-semibold">
                      {model.contextWindow}
                    </td>
                  ))}
                </tr>

                {/* Pricing / Economics */}
                <tr>
                  <td className="p-3 bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-zinc-400 font-medium sticky left-0 z-10">
                    API Pricing (1M Tokens)
                  </td>
                  {models.map((model) => (
                    <td key={model.id} className="p-3 border border-zinc-800 text-zinc-300 font-mono text-xs">
                      <div className="flex flex-col gap-0.5">
                        <div>
                          <span className="text-zinc-500">In:</span> <span className="text-emerald-400">${model.pricing.inputPer1M.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">Out:</span> <span className="text-zinc-200">${model.pricing.outputPer1M.toFixed(2)}</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Open Source & Licensing */}
                <tr>
                  <td className="p-3 bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-zinc-400 font-medium sticky left-0 z-10">
                    Open Source & License
                  </td>
                  {models.map((model) => (
                    <td key={model.id} className="p-3 border border-zinc-800 text-zinc-300 text-xs font-mono">
                      <div className="font-semibold text-zinc-100">{model.openSourceStatus}</div>
                      <div className="text-[11px] text-zinc-400">{model.license}</div>
                    </td>
                  ))}
                </tr>

                {/* Hardware Inference Requirements */}
                <tr>
                  <td className="p-3 bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-zinc-400 font-medium sticky left-0 z-10">
                    Hardware Footprint
                  </td>
                  {models.map((model) => (
                    <td key={model.id} className="p-3 border border-zinc-800 text-zinc-300 text-xs">
                      {model.hardwareRequirements}
                    </td>
                  ))}
                </tr>

                {/* Benchmarks Matrix */}
                {benchmarkKeys.map((benchName) => (
                  <tr key={benchName}>
                    <td className="p-3 bg-zinc-900/60 border border-zinc-800 font-mono text-xs text-cyan-400 font-semibold sticky left-0 z-10">
                      {benchName}
                    </td>
                    {models.map((model) => {
                      const benchmarkEntry = model.benchmarks.find((b) =>
                        b.benchmarkName.toLowerCase().includes(benchName.toLowerCase().slice(0, 5))
                      );
                      return (
                        <td key={model.id} className="p-3 border border-zinc-800">
                          {benchmarkEntry ? (
                            <div>
                              <div className="font-mono text-sm font-bold text-zinc-100">
                                {benchmarkEntry.score}
                                {benchmarkEntry.unit || '%'}
                              </div>
                              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                                {benchmarkEntry.vsPreviousGen}
                              </div>
                            </div>
                          ) : (
                            <span className="text-zinc-600 font-mono text-xs">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Key Improvements */}
                <tr>
                  <td className="p-3 bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-zinc-400 font-medium sticky left-0 z-10">
                    Key Strengths
                  </td>
                  {models.map((model) => (
                    <td key={model.id} className="p-3 border border-zinc-800 text-xs text-zinc-300">
                      <ul className="space-y-1.5 list-disc list-inside">
                        {model.keyImprovements.slice(0, 3).map((imp, idx) => (
                          <li key={idx} className="leading-snug">
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Known Limitations */}
                <tr>
                  <td className="p-3 bg-zinc-900/40 border border-zinc-800 font-mono text-xs text-zinc-400 font-medium sticky left-0 z-10">
                    Known Caveats / Limits
                  </td>
                  {models.map((model) => (
                    <td key={model.id} className="p-3 border border-zinc-800 text-xs text-zinc-400">
                      <ul className="space-y-1.5 list-disc list-inside">
                        {model.knownLimitations.slice(0, 3).map((lim, idx) => (
                          <li key={idx} className="leading-snug">
                            {lim}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>All scores verified independently by NextVector Evaluation Labs.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors font-medium"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
