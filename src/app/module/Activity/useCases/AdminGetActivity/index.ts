import ActivityRepository from '../../repositories/implementation/ActivityRepository';

export default async function AdminGetActivity(organizationId: string) {
  const getActivity = await ActivityRepository.getAllActivitysByOrganizationId(organizationId);

  const getAllNameOfSubejcts = Array.from(new Set(getActivity
    .map(({ subject: { name } }) => name)));

  const organizatedArrayWithActivity = getAllNameOfSubejcts
    .map((verifyNameSubject) => getActivity
      .filter(({ subject: { name } }) => name === verifyNameSubject))
    .map((arrayActivity, interador) => (
      {
        nameSubject: getAllNameOfSubejcts[interador],
        activitys: arrayActivity.map((eachActivity) => eachActivity),
      }
    ));

  return organizatedArrayWithActivity;
}
