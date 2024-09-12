import supabaseService from '../../../lib/supabaseServiceClient';

export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabaseService
      .from('user')
      .select('profile_background, pfp, name')
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
