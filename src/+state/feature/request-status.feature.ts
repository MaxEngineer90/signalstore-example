import {signalStoreFeature, withComputed, withState} from '@ngrx/signals';
import {computed} from '@angular/core';


export type RequestStatusFeature = 'init' | 'loading' | 'loaded' | { error: string };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<{ callState: RequestStatusFeature }>({callState: 'init'}),
    withComputed(({callState}) => ({
      loading: computed(() => callState() === 'loading'),
      loaded: computed(() => callState() === 'loaded'),
      error: computed(() => {
        const state = callState();
        return typeof state === 'object' ? state.error : null
      }),
    }))
  );
}


export function setLoading(): { callState: RequestStatusFeature } {
  return {callState: 'loading'};
}

export function setLoaded(): { callState: RequestStatusFeature } {
  return {callState: 'loaded'};
}

export function setError(error: string): { callState: RequestStatusFeature } {
  return {callState: {error}};
}
