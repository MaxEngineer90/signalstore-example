import {EntityId, EntityState} from '@ngrx/signals/entities';
import {signalStoreFeature, type, withComputed, withState} from '@ngrx/signals';
import {computed} from '@angular/core';

export type SelectedEntityState = { selectedEntityId: EntityId | null };

export function withSelectedEntity<Entity>() {
  return signalStoreFeature(
    {state: type<EntityState<Entity>>()},
    withState<SelectedEntityState>({selectedEntityId: null}),
    withComputed(({entityMap, selectedEntityId}) => ({
      selectedEntity: computed(() => {
        const selectedId = selectedEntityId();
        return selectedId ? entityMap()[selectedId] : null;
      }),
    }))
  );
}
