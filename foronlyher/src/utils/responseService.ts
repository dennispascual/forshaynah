export interface ShaynahResponses {
  forgiveness: string;
  love: string;
  address: string;
  phone: string;
  freeTime: string;
  hangout: string;
  timestamp?: string;
}

export function getAllSavedResponses(): ShaynahResponses {
  try {
    return {
      forgiveness: localStorage.getItem('shaynah_forgiveness_answer') || 'Not answered',
      love: localStorage.getItem('shaynah_love_answer') || 'Not answered',
      address: localStorage.getItem('shaynah_gift_address') || 'Not provided',
      phone: localStorage.getItem('shaynah_gift_phone') || 'Not provided',
      freeTime: localStorage.getItem('shaynah_freetime_answer') || 'Not answered',
      hangout: localStorage.getItem('shaynah_hangout_gala_answer') || 'Not answered',
      timestamp: new Date().toISOString(),
    };
  } catch {
    return {
      forgiveness: 'Not answered',
      love: 'Not answered',
      address: 'Not provided',
      phone: 'Not provided',
      freeTime: 'Not answered',
      hangout: 'Not answered',
      timestamp: new Date().toISOString(),
    };
  }
}

let hasSentEmail = false;

/**
 * Sends one combined email containing all collected responses from Pages 7–11.
 * Guaranteed to execute only once.
 */
export async function sendCombinedEmailOnce(finalData?: Partial<ShaynahResponses>): Promise<boolean> {
  if (hasSentEmail) {
    console.log('Email already sent previously. Skipping duplicate send.');
    return true;
  }

  try {
    const current = getAllSavedResponses();
    const payload = {
      ...current,
      ...finalData,
      timestamp: new Date().toISOString(),
    };

    hasSentEmail = true;

    const response = await fetch('/api/send-responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn('API send returned status:', response.status);
      return false;
    }

    const data = await response.json();
    console.log('✅ Single combined email dispatched to densiopascual@gmail.com:', data);
    return true;
  } catch (error) {
    console.error('Error sending combined email to backend:', error);
    return false;
  }
}

