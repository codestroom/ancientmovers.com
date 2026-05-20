import useCountUp from '../hooks/useCountUp.js';

/**
 * Parses a label like "10,000+", "4.9 / 5", "15+", "100%" and animates the
 * leading number. Anything non-numeric (suffix/prefix) is preserved.
 */
export default function CountStat({ value, label }) {
  // Extract the first numeric token
  const match = value.match(/([0-9.,]+)/);
  if (!match) {
    return (
      <div className="whyus__stat">
        <div className="whyus__stat-num">{value}</div>
        <div className="whyus__stat-label">{label}</div>
      </div>
    );
  }

  const numStr = match[1];
  const target = parseFloat(numStr.replace(/,/g, ''));
  const decimals = (numStr.split('.')[1] || '').length;

  const [ref, current] = useCountUp(target, { duration: 1800, decimals });

  // Format with commas if original had commas
  const formatted = numStr.includes(',')
    ? Number(current).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : current;

  const displayed = value.replace(numStr, formatted);

  return (
    <div ref={ref} className="whyus__stat">
      <div className="whyus__stat-num">{displayed}</div>
      <div className="whyus__stat-label">{label}</div>
    </div>
  );
}
