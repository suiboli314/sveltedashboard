import type { FullAutoFill } from "svelte/elements";
import { m } from "$lib/paraglide/messages";

export type inputType = {
  name?: string;
  type: string;
  id: string;
  placeholder?: string;
  autocomplete: string;
  required?: boolean;
};

export const firstname = (id: string, placeholder = false) => {
  return {
    name: "first_name",
    type: "text",
    id: "first_name-" + id,
    placeholder: placeholder ? m.first_name_label() : undefined,
    autocomplete: "given-name" as FullAutoFill,
    required: true
  } satisfies inputType;
};

export const lastname = (id: string, placeholder = false) => {
  return {
    name: "last_name",
    type: "text",
    id: "last_name-" + id,
    placeholder: placeholder ? m.last_name_label() : undefined,
    autocomplete: "family-name" as FullAutoFill
  } satisfies inputType;
};

export const password = (
  id: string,
  signup = false,
  visiblePassword = false,
  placeholder = false
) => {
  return {
    name: "password",
    type: visiblePassword ? "text" : "password",
    id: "password-" + id,
    placeholder: placeholder ? m.password_hint() : undefined,
    autocomplete: signup
      ? ("new-password" as FullAutoFill)
      : ("current-password" as FullAutoFill),
    required: true
  } satisfies inputType;
};

export const confirmPassword = (
  id: string,
  visiblePassword = false,
  placeholder = false
) => {
  return {
    type: visiblePassword ? "text" : "password",
    id: "confirm_password-" + id,
    placeholder: placeholder ? m.confirm_password_hint() : undefined,
    autocomplete: "current-password" as FullAutoFill,
    required: true
  } satisfies inputType;
};

export const username = (id: string, placeholder = false) => {
  return {
    name: "username",
    type: "username",
    id: "username-" + id,
    placeholder: placeholder ? m.username_hint() : undefined,
    autocomplete: "username" as FullAutoFill,
    required: true
  } satisfies inputType;
};

export const remember_me = {
  name: "remember_me",
  value: "remember_me"
};
