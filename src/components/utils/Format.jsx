export function formatTime(seconds) {
    // Calculate minutes
    const minutes = Math.floor(seconds / 60);
    
    // Calculate remaining seconds
    const remainingSeconds = Math.floor(seconds % 60);
    //console.log(seconds % 60,Math.floor(seconds % 60));
    
  
    // Return formatted time with zero-padded seconds
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}