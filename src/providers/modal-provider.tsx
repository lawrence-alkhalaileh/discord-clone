"use client";

import {
  CreateServerModal,
  InviteModal,
  EditServerModal,
  CreateChannelModal,
  LeaveServerModal,
  MembersModal,
  DeleteServerModal,
} from "@/components/modals/z-index";

export const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  );
};
