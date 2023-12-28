import React from "react";
import { TextStyle, ViewStyle } from "react-native";

export interface CustomViewProps {
  children: React.ReactNode;
  customStyles?: {
    view?: ViewStyle;
  };
  shouldScrollWithKeyboardAvoidingView?: boolean;
  autoFocusInputWithoutButtonWithScroll?: boolean;

  ShouldScrolled?: boolean;
  Button?: React.ReactNode;
}

export interface GradientTextProps {
  customStyles?: {
    text?: TextStyle;
    gradient?: ViewStyle;
    gradientContainer?: ViewStyle;
  };
  customColors?: string[];
  text: string;
}

export interface TextIconProps {
  icon?: React.ReactNode;
  placeholder: string;
  customStyles?: {
    textInput?: TextStyle;
    gradient?: ViewStyle;
    InputContainer?: ViewStyle;
  };
  focus?: boolean;
}

export interface NavigationProps {
  navigate: (arg: string) => void;
  goBack?: any;
}

export interface BackButtonProps {
  color?: string;
  title?: string;
  customStyles?: {
    view?: ViewStyle;
    text?: TextStyle;
  };
}

export type SalesProps = Array<{
  created_at?: string;
  id?: number;
  price?: number;
  sold_count?: number;
  status?: "created" | "sold";
  stripe_price_id?: string;
  stripe_product_id?: string;
  updated_at?: string;
  user_id?: number;
}>;

export interface UserProps {
  token?: string | undefined;
  status?: "activated" | "created" | undefined;
}

export interface ContextType {
  user: UserProps | null;
  setUser: (arg: UserProps) => void;
}

export type LoginResponse = {
  status: string;
  token: string;
  message: string;
};
export type RegisterResponse = {
  token: string;
  message: string;
};
