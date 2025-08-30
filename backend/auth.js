const attempts = {}; // store login attempts per facialId

function recordAttempt({ facialId, gps, success }) {
  if (!attempts[facialId]) attempts[facialId] = [];
  attempts[facialId].push({ ts: Date.now(), gps, success });

  attempts[facialId] = attempts[facialId].filter(a => Date.now() - a.ts < 86400000);

  const fails = attempts[facialId].filter(a => !a.success && Date.now() - a.ts < 600000);
  if (fails.length > 5) return { blocked: true, reason: "Brute force detected" };

  if (attempts[facialId].length > 1) {
    const prev = attempts[facialId][attempts[facialId].length - 2].gps;
    if (prev && gps && distanceKm(prev, gps) > 100) {
      return { blocked: false, note: "Unusual login location detected" };
    }
  }
  return { blocked: false };
}

function distanceKm(loc1, loc2) {
  if (!loc1 || !loc2) return 0;
  return Math.sqrt(Math.pow(loc1.lat - loc2.lat, 2) + Math.pow(loc1.lng - loc2.lng, 2)) * 111;
}

module.exports = { recordAttempt };
