export const daysinFuture = (daysInFuture: number) => {
    const secondsSinceEpoch = Math.floor(Date.now() / 1000); // Current time in seconds
    const secondsInADay = 24 * 60 * 60;
    const ttl = secondsSinceEpoch + daysInFuture * secondsInADay;
    return ttl;
};