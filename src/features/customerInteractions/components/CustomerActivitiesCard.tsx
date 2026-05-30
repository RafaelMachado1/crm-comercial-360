import {
  getCustomerActivityResultLabel,
  getCustomerActivityTypeLabel,
  getInteractionChannelLabel,
} from "../data/customerInteractionOptions";
import type { CustomerActivity } from "../types/customerInteraction.types";

type CustomerActivitiesCardProps = {
  activities: CustomerActivity[];
  loading?: boolean;
  onCreateActivity: () => void;
  onEditActivity: (activity: CustomerActivity) => void;
};

export function CustomerActivitiesCard({
  activities,
  loading = false,
  onCreateActivity,
  onEditActivity,
}: CustomerActivitiesCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Atividades realizadas
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Histórico de interações comerciais deste cliente.
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateActivity}
            className="h-10 w-fit appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-4 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Registrar atividade
          </button>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando atividades...
          </div>
        ) : activities.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              Nenhuma atividade registrada.
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              As interações realizadas com este cliente aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <article
                key={activity.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {getCustomerActivityTypeLabel(activity.type)}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {activity.date} às {activity.time}
                    </p>

                    {activity.details && (
                      <p className="mt-2 text-sm text-slate-500">
                        {activity.details}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {getInteractionChannelLabel(activity.channel)}
                    </span>

                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {getCustomerActivityResultLabel(activity.result)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <button
                    type="button"
                    onClick={() => onEditActivity(activity)}
                    className="appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    Editar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
